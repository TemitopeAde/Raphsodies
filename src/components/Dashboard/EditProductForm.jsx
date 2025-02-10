import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X, Upload } from "lucide-react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

const ORIGIN = "https://raphsodies.vercel.app";

const Spinner = () => (
  <div className="inline-block h-5 w-5">
    <div className="h-full w-full rounded-full border-2 border-b-transparent border-white animate-spin" />
  </div>
);

const ImageDropzone = ({ onImageSelect, imagePreview, isUploading, onRemoveImage }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      onImageSelect(file);
    } else {
      toast.error('Please upload a valid image file (jpg, png, etc.)');
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      onImageSelect(file);
    } else {
      toast.error('Please upload a valid image file (jpg, png, etc.)');
    }
  };

  return (
    <div className="space-y-2">
      <Label>Product Image</Label>
      <div
        className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
          isDragging ? 'border-green-500 bg-green-500/10' : 'border-gray-600 hover:border-gray-500'
        } ${imagePreview ? 'bg-gray-800' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {isUploading ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <Spinner />
            <p className="text-gray-400">Uploading image...</p>
          </div>
        ) : imagePreview ? (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="rounded-lg max-h-40 w-full object-cover"
            />
            <button
              type="button"
              className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70"
              onClick={onRemoveImage}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <Upload className="h-8 w-8 text-gray-400" />
            <p className="text-gray-400 text-center">
              Drag and drop your image here, or{' '}
              <button
                type="button"
                className="text-blue-500 hover:text-blue-400"
                onClick={() => fileInputRef.current?.click()}
              >
                browse
              </button>
            </p>
            <p className="text-gray-500 text-sm">Supported formats: JPG, PNG, GIF</p>
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

const EditProductForm = ({ isOpen, onClose, product, onEditProduct }) => {
  const queryClient = useQueryClient();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [description, setDescription] = useState("");

  const { 
    register, 
    handleSubmit, 
    reset, 
    setValue, 
    watch,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      price: '',
      stock: '',
      category: '',
      attributes: ''
    }
  });
  
  const watchedFields = watch(); // Watches all form fields dynamically
  console.log({watchedFields});
  
  
  

  const createInitialEditorState = (text) => {
    return {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: text,
                type: "text",
                version: 1
              }
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1
          }
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "root",
        version: 1
      }
    };
  };

  const initialConfig = {
    namespace: 'ProductDescription',
    nodes: [],
    onError: (error) => {
      console.error(error);
    },
    theme: {
      text: {
        base: 'text-white',
        bold: '',
        italic: 'italic',
        underline: 'underline',
        strikethrough: 'line-through',
        underlineStrikethrough: 'underline line-through',
      }
    }
  };

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("price", product.price);
      setValue("stock", product.stock);
      setValue("category", product.category?.name);
      setValue("attributes", product.attributes?.join(", "));
      setImagePreview(product.imageUrl);
      setImageUrl(product.imageUrl); 
      setValue("priceDollar", product?.priceDollar)

      const initialEditorState = {
        root: {
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: product.description || "",
                  type: "text",
                  version: 1,
                },
              ],
              direction: null,
              format: "",
              indent: 0,
              type: "paragraph",
              version: 1,
            },
          ],
          direction: null,
          format: "",
          indent: 0,
          type: "root",
          version: 1,
        },
      };
      
      setDescription(JSON.stringify(initialEditorState));
    }
  }, [product, setValue]);
  

  const Editor = () => {
    return (
      <LexicalComposer initialConfig={{
        ...initialConfig,
        editorState: description || undefined,
      }}>
        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable 
                className="min-h-[100px] outline-none px-2 py-1"
              />
            }
            placeholder={
              <div className="absolute top-[1.125rem] left-[1.125rem] text-gray-400">
                Enter product description...
              </div>
            }
          />
          <HistoryPlugin />
          <OnChangePlugin
            onChange={(editorState) => {
              try {
                const jsonState = editorState.toJSON();
                setDescription(JSON.stringify(jsonState));
              } catch (error) {
                console.error('Error updating editor state:', error);
              }
            }}
          />
        </div>
      </LexicalComposer>
    );
  };


  const uploadImage = async imageFile => {
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await fetch(`${ORIGIN}/api/products/upload-image`, {
        method: "POST",
        body: formData
      });

      if (!response.ok) throw new Error("Image upload failed");

      const data = await response.json();
      setImageUrl(data.url);
      setIsUploading(false);

      toast.success('Image uploaded successfully!');
    } catch (error) {
      setIsUploading(false);
      toast.error('Image upload failed. Please try again.');
    }
  };

  const handleImageSelect = (file) => {
    setImagePreview(URL.createObjectURL(file));
    uploadImage(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageUrl(null);
  };

  const extractTextFromDescription = (descriptionJSON) => {
    try {
      const parsedDescription = JSON.parse(descriptionJSON);
      const children = parsedDescription?.root?.children || [];
  
      return children
        .map((child) =>
          child.children?.map((textNode) => textNode.text).join(" ")
        )
        .join("\n")
        .trim();
    } catch (error) {
      console.error("Error parsing description:", error);
      return "";
    }
  };

  const updateProduct = async data => {
    if (!imageUrl) throw new Error("Image upload required");

    const attrArray = data.attributes.split(",").map(attr => attr.trim());
    const extractedText = extractTextFromDescription(description);

    const productData = {
      id: product?.id,
      name: data.name,
      description: extractedText,
      price: Number(data.price),
      priceDollar: Number(data.priceDollar),
      stock: Number(data.stock),
      attributes: attrArray,
      categoryName: data.category,
      imageUrl: imageUrl,
    };

    if (product) {
      
      const response = await fetch(`${ORIGIN}/api/products/products/${product.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer YOUR_ACCESS_TOKEN`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) throw new Error("Failed to update product");
      return response.json();
    } else {
      // Create new product
      const response = await fetch(`${ORIGIN}/api/products/create-product`, {
        method: "POST",
        headers: {
          Authorization: `Bearer YOUR_ACCESS_TOKEN`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) throw new Error("Failed to create product");
      return response.json();
    }
  };

  const mutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success(`Product ${product ? 'updated' : 'created'} successfully! 🎉`);
      reset();
      setImagePreview(null);
      setImageUrl(null);
      setDescription("");
      onClose();
      if (product && onEditProduct) {
        onEditProduct();
      }
    },
    onError: () => {
      toast.error(`Failed to ${product ? 'update' : 'create'} product. Please check your input and try again.`);
    }
  });

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[60vw] font-freize max-h-[90vh] overflow-y-auto scrollbar-hide">
        <DialogHeader className="flex justify-between flex-row">
          <DialogTitle className="text-white text-2xl font-unbounded">
            {product ? 'Edit Product' : 'Add Product'}
          </DialogTitle>
          <X
            className="cursor-pointer text-gray-400 hover:text-white"
            onClick={onClose}
          />
        </DialogHeader>

        <form
          onSubmit={handleSubmit(mutation.mutate)}
          className="space-y-4 text-white font-unbounded"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name", { required: "Product name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <div className="border p-2 rounded-lg bg-transparent text-white max-h-40 overflow-y-auto">
              <Editor />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step="1"
              className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              {...register("price", {
                required: "Price is required",
                min: { value: 1, message: "Price must be greater than 0" }
              })}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="priceDollar"
              type="number"
              step="1"
              className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              {...register("priceDollar", {
                required: "Price in dollar is required",
                min: { value: 1, message: "Price must be greater than 0" }
              })}
            />
            {errors.priceDollar && (
              <p className="text-red-500 text-sm">{errors.priceDollar.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              step="1"
              className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              {...register("stock", {
                required: "Stock is required",
                min: { value: 1, message: "Stock must be greater than 0" }
              })}
            />
            {errors.stock && (
              <p className="text-red-500 text-sm">{errors.stock.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              {...register("category", { required: "Category is required" })}
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="attributes">Attributes</Label>
            <Input
              id="attributes"
              placeholder="Comma separated values"
              {...register("attributes", {
                required: "Attributes is required"
              })}
            />
            {errors.attributes && (
              <p className="text-red-500 text-sm">{errors.attributes.message}</p>
            )}
          </div>

          <ImageDropzone
            onImageSelect={handleImageSelect}
            imagePreview={imagePreview}
            isUploading={isUploading}
            onRemoveImage={handleRemoveImage}
          />
          
          <Button
            type="submit"
            disabled={!isValid || isUploading || mutation.isPending}
            className={`w-full font-bold text-xl mt-4 flex items-center justify-center gap-2 
                ${!isValid || isUploading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
            >
            {mutation.isPending ? (
                <>
                <Spinner />
                <span>{product ? 'Updating' : 'Creating'} Product...</span>
                </>
            ) : (
                <span>{product ? 'Update' : 'Add'} Product</span>
            )}
        </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductForm;