"use client";

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Chevron icons

const AccordionSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionItems = [
    {
      title: "Tell me about African Rhapsody, can I see your products?",
      content: (
        <>
          Welcome to African Rhapsody!<br /><br />
          We’re more than just a skincare brand—we provide transformative, science-backed solutions for every skin need. At African Rhapsody, we blend botanical wisdom with cosmetic science to create effective products that tackle stubborn skin concerns, including:
          <ul>
            <li>✨ Hormonal & stubborn acne</li>
            <li>✨ IGH (Idiopathic Guttate Hypomelanosis)</li>
            <li>✨ Eczema, Versicolor & irritation</li>
            <li>✨ Stretch marks & aging skin</li>
            <li>✨ Dull skin & hyperpigmentation</li>
            <li>✨ Sunburn & more</li>
          </ul>
          We offer two product lines:
          <ul>
            <li>African Rhapsody Beauty Products – For glowing, radiant skin</li>
            <li>Specialized Skin Disorder Line – Targeted care for specific skin challenges</li>
          </ul>
          Got a concern? Share it with us, and we’ll recommend the perfect solution!<br />
          Send us a message on <a className="text-blue-600 underline" href="https://wa.me/message/LHXK3SHVMU6YC1">WhatsApp.</a> 
        </>
      ),
    },
    {
      title: "I am battling with serious Acne, pimples what can I use?",
      content: (
        <>
          <p>
            Our approach to acne care is truly innovative, moving beyond the usual AHAs, BHAs. Traditional BHAs can be harsh on sensitive skin and often fall short in treating stubborn acne. Our breakthrough formula offers a gentler, more effective solution, delivering powerful results for even the most challenging skin types. A combo that works to balance oil, banish acne-causing bacteria, and restore your skin.
          </p>
          <br />
          <a href="#acne" className="font-semibold cursor-pointer mb-2 block">
            Acne Treatment Solution:
          </a>
          <ul className="list-disc pl-6">
            <li>
              <span className="font-medium">Skin Treatment Elixir:</span> A botanical powerhouse that fights acne-causing bacteria, dries out active acne, and speeds up skin healing. Works on hormonal and fungal acne too – even for sensitive skin.
            </li>
            <li>
              <span className="font-medium">Acne Control Plant Essence:</span> A gentle face wash that controls oil production, tackles acne, heals, and revitalizes your skin—perfect for oily skin.
            </li>
            <li>
              <span className="font-medium">Repair Cream:</span> Repairs damaged skin, fades dark spots, acne scars, and boosts cell regeneration.
            </li>
            <li>
              <span className="font-medium">African Rhapsody Exfoliator:</span> Deeply cleanses and unclogs pores, removing impurities while enhancing product absorption for better results.
            </li>
          </ul>
          <br />
          <p className="font-semibold mt-4 mb-2">Why Choose Us?</p>
          <p>
            Our solution is research-based & different, it has been tried, tested, and trusted by over 1,000 satisfied customers who have beat stubborn acne—cystic, hormonal, and more. You’ll start seeing results in as little as 4 weeks, with many experiencing changes in the first 2 weeks. Plus, our products are formulated to last up to a month!
          </p>
          <br />
          <p className="font-semibold mt-3 mb-2">Hear from our customers:</p>
          <p>
            ‘Your Products really repaired my skin”.
          </p>
          <a
            href="https://www.instagram.com/africanrhapsody/reel/DBJn6X8MxJj/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            https://www.instagram.com/africanrhapsody/reel/DBJn6X8MxJj
          </a>
          <br />
          <a
            href="https://www.instagram.com/africanrhapsody/reel/DAjZosGsfp_/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            https://www.instagram.com/africanrhapsody/reel/DAjZosGsfp_
          </a>
          <br /><br />
          <p className="font-semibold mt-3 mb-2">How to Use:</p>
          <p>
            Morning: Wash with Acne control plant essence, follow with your brand of moisturizer and sunscreen.
          </p>
          <p>
            Night: Wash with Acne control plant essence, follow with the skin treatment elixir and repair cream.
          </p>
          <p>
            Please stay consistent with the routine. You can also consider cutting down on triggers like milk, sugar, nuts, etc.
          </p>
          <br />
          <p>
            Got questions? Send us a message on{" "}
            <a
              href="https://wa.me/message/LHXK3SHVMU6YC1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              WhatsApp.
            </a>
          </p>
        </>
      ),
    },
    {
      title: "I am battling with sunburn, what can I use?",
      content: (
        <>
          <p>
            First, ensure that it’s sunburn and not Ochronosis, which is often mistaken for sunburn. Using treatments for sunburn on ochronosis can make it worse. Unlike regular sunburn treatments that don’t work, we offer a highly effective, research-based solution for sunburn that not only addresses the condition but also tackles redness, helps heal, and restores your skin. Sunburn is primarily caused by UV damage, and it’s advisable you get a sunscreen.
          </p>
          <br />
          <p className="font-semibold">Our Solution:</p>
          <ul className="list-disc pl-6">
            <li>
              <span className="font-medium">pH-Balancing, Hydrating & Brightening Face Wash</span> – Designed to gently exfoliate, rebuild your skin barrier, restore its acid mantle, and gradually brighten hyperpigmented areas.
            </li>
            <li>
              <span className="font-medium">Repair Cream:</span> Formulated to target hyperpigmented patches from sunburn, this cream renews and restores the skin for a more even complexion.
            </li>
          </ul>
          <br />
          <p className="font-semibold mt-3 mb-2">What makes our solution different?</p>
          <p>
            Our sunburn solution is a research-based solution tested and reviewed positively by 1000+ customers who have used it to tackle sunburn successfully and restore their skin.
          </p>
          <br />
          <p className="font-semibold mt-3 mb-2">How to Use:</p>
          <p>
            Night: Wash with your face wash, pat dry, follow with the skin treatment elixir and repair cream.
          </p>
          <p>
            Please stay consistent with the routine and use your sunscreen every morning.
          </p>
          <br />
          <p>
            Got questions? Send us a message on{" "}
            <a
              href="https://wa.me/message/LHXK3SHVMU6YC1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              WhatsApp.
            </a>
          </p>
        </>
      ),
    },
    {
      title: "I am battling with hyperpigmentation, what can I use?",
      content: (
        <>
          <p>
            Hyperpigmentation can be challenging to treat. Many people turn to steroid-based creams, which often cause redness and further skin damage. Factors like sun exposure, stress, and inflammation can trigger it. That’s why we developed a safe, effective, and NAFDAC-approved botanical solution to restore your skin’s natural glow—without harmful ingredients or steroids.
          </p>
          <br />
          <p className="font-semibold">Step 1: Always Use Sunscreen.</p>
          <p>
            Sun protection is essential to prevent further darkening and support the healing process. Ensure you get a good sunscreen with SPF50.
          </p>
          <br />
          <p className="font-semibold">Our Hyperpigmentation-Fighting Essentials:</p>
          <ul className="list-disc pl-6">
            <li>
              <span className="font-semibold">Repair Cream</span> – Specifically formulated to target stubborn dark patches, this cream renews your skin for a more even complexion.
            </li>
            <li>
              <span className="font-semibold">African Rhapsody Exfoliator</span> – Unclogs pores and preps the skin for deeper absorption of treatments, making your skincare more effective.
            </li>
            <li>
              <span className="font-semibold">pH-Balancing, Hydrating & Brightening Face Wash</span> – Designed to gently exfoliate, rebuild your skin barrier, restore its acid mantle, and gradually brighten hyperpigmented areas.
            </li>
          </ul>
          <br />
          <p className="font-semibold">Why Choose Us?</p>
          <p>
            Our solutions are scientifically-backed and botanically formulated to nurture your skin. No steroids, no harsh chemicals—just results-driven care designed for healthy, radiant skin.
          </p>
          <br />
          <p className="font-semibold">What makes our solution different?</p>
          <p>
            Our solution is a research-based solution tested and reviewed positively by 1000+ customers who have used it to tackle hyperpigmentation successfully and restore their skin.
          </p>
          <br />
          <p>
            See this beautiful review:{" "}
            <a
              href="https://www.instagram.com/africanrhapsody/reel/DAJw90HsTb6/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Review
            </a>
          </p>
          <br />
          <p className="font-semibold">How to Use:</p>
          <ul className="list-disc pl-6">
            <li>
              Start with the exfoliator, massage on the area gently, and leave on for at least 20 minutes before washing off. Exfoliate 2/3 times a week.
            </li>
            <li>
              Morning: PH face wash, brand of moisturizer, and sunscreen.
            </li>
            <li>
              Night: Wash with the PH balancing face wash, pat dry, follow with the repair cream.
            </li>
          </ul>
          <br />
          <p>
            Please stay consistent with the routine and use your sunscreen every morning.
          </p>
          <br />
          <p>
            Got questions? Send us a chat on{" "}
            <a
              href="https://wa.me/message/LHXK3SHVMU6YC1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              WhatsApp
            </a>
            .
          </p>
        </>
      ),
    },
    {
      title: "I am battling with white patches, what can I use?",
      content: (
        <>
          <p>
            White patches on the skin can indicate a range of conditions, including IGH, versicolor, eczema, and psoriasis. To recommend the right solution, we’ll need to see a picture of the affected area for accurate advice.
          </p>
          <br />
          <p className="font-semibold">If It’s IGH (Idiopathic Guttate Hypomelanosis):</p>
          <p>
            IGH is a common condition, often triggered by aging, sun exposure, or using poor-quality skincare products. If this is a new development, consider reviewing your skincare routine, especially if the area is rarely exposed to the sun.
          </p>
          <br />
          <p className="font-semibold">Our Effective IGH Solutions:</p>
          <ul className="list-disc pl-6">
            <li>
              <span className="font-semibold">Elaeophorbia Genus Oil:</span> Unlock the power of traditional African healing with this multi-purpose botanical oil. Extracted from Elaeophorbia genus, it offers anti-inflammatory, antibacterial, and antiviral properties—making it ideal for treating IGH, eczema, dermatitis, and other skin disorders.
            </li>
            <li>
              <span className="font-semibold">Sapphire Butter:</span> A deeply nourishing blend for damaged skin, IGH, age spots, and dry or flaky skin. It helps repair and rejuvenate for softer, healthier skin.
            </li>
          </ul>
          <br />
          <p className="font-semibold">Why Choose Us?</p>
          <p>
            Our solutions are scientifically-backed and botanically formulated to nurture your skin without steroids or harsh chemicals. We’ve helped over 1,000 satisfied customers manage IGH and restore their skin to its natural beauty.
          </p>
          <br />
          <p className="font-semibold">How to Use:</p>
          <p>
            Apply Elaeophorbia Genus Oil to the affected area morning and night after your shower for best results.
          </p>
          <br />
          <p>
            We’d love to hear about your progress! Don’t forget to send us a review and spread the word once you start seeing results.
          </p>
          <br />
          <p>
            Got questions? Send us a chat on{" "}
            <a
              href="https://wa.me/message/LHXK3SHVMU6YC1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              WhatsApp
            </a>
            .
          </p>
        </>
      ),
    },
    {
      title: "I am battling with Eczema, what can I use?",
      content: (
        <>
          <p>
            We offer a highly effective, research-based solution for eczema that not only addresses the condition but also helps heal and restore your skin.
          </p>
          <br />
          <p className="font-semibold">Our Solution:</p>
          <ul className="list-disc pl-6">
            <li>
              <span className="font-semibold">Botanical Repair Soap:</span> Formulated to directly combat eczema, this soap soothes and repairs irritated skin, peels off eczema, promoting healing.
            </li>
            <li>
              <span className="font-semibold">Euphorbia Genus Oil:</span> A potent anti-inflammatory oil that targets eczema, providing relief while nourishing and restoring the skin's health.
            </li>
            <li>
              <span className="font-semibold">Skin Treatment Elixir:</span> A botanical formula that helps repair and rejuvenate the skin.
            </li>
          </ul>
          <br />
          <p className="font-semibold">Why Choose Us?</p>
          <p>
            Our solutions are scientifically-backed and botanically formulated to nurture your skin without steroids or harsh chemicals. We’ve helped over 1,000 satisfied customers tackle eczema and restore their skin to its natural beauty.
          </p>
          <br />
          <p className="font-semibold">How to Use:</p>
          <p>
            Apply Elaeophorbia Genus Oil to the affected area morning and night after your shower with botanical repair soap for best results.
          </p>
          <br />
          <p>
            We’d love to hear about your progress! Don’t forget to send us a review and spread the word once you start seeing results.
          </p>
          <br />
          <p>
            Got questions? Send us a chat on{" "}
            <a
              href="https://wa.me/message/LHXK3SHVMU6YC1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              WhatsApp
            </a>
            .
          </p>
        </>
      ),
    },
    {
      title: "Do you have something for kids?",
      content: (
        <>
          <p>
            Kids are often exposed to bacteria & prone to skin issues like rashes, eczema & pimples. Many antibacterial soaps disrupt their skin’s natural pH balance, leading to dryness without providing nourishment. African Rhapsody Nourish & Protect provides a unique research-backed solution to children’s skincare.
          </p>
          <br />
          <p className="font-semibold">Our Solution:</p>
          <ul className="list-disc pl-6">
            <li>
              <span className="font-semibold">Nourish & Protect for Kids:</span> This formula blends Africa’s nourishing & anti-inflammatory herbs to protect & nourish young skin with essential proteins & antioxidants. Helping to prevent skin disorders & promoting a healthy, radiant complexion.
            </li>
            <li>
              <span className="font-semibold">Sapphire Butter for Kids:</span> Packed with occlusives, fatty acids, and triglycerides, Sapphire Butter is a powerhouse for your child’s skin. It strengthens the natural barrier, prevents dryness and common skin issues, and delivers deep, soothing hydration. The result? Soft, nourished skin that stays protected and moisturized all day long.
            </li>
          </ul>
          <br />
          <p>
            Got questions? Send us a chat on{" "}
            <a
              href="https://wa.me/message/LHXK3SHVMU6YC1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              WhatsApp
            </a>
            .
          </p>
        </>
      ),
    },
    {
      title: "I have dull skin what can I use?",
      content: (
        <>
          <p className="font-semibold">Let’s Bring Back Your Glow!</p>
          <p>
            We offer a powerful skincare solution to rejuvenate your skin, smooth fine lines, and restore a radiant, glowing complexion. Here’s what we recommend for face and body care:
          </p>
          <br />
          <p className="font-semibold">Face Essentials:</p>
          <ul className="list-disc pl-6">
            <li>
              <span className="font-semibold">Repair Cream</span> – Targets dark spots, hyperpigmentation, and dullness while restoring your skin’s natural radiance.
            </li>
            <li>
              <span className="font-semibold">pH-Balancing, Hydrating & Brightening Face Wash</span> – Strengthens your skin barrier, nurtures the acid mantle, and leaves your skin hydrated and refreshed.
            </li>
            <li>
              <span className="font-semibold">Age-Defying Barrier Serum</span> – Smooths fine lines, combats signs of aging, and restores youthful glow.
            </li>
          </ul>
          <br />
          <p className="font-semibold">Body Essentials:</p>
          <ul className="list-disc pl-6">
            <li>
              <span className="font-semibold">Sheba’s Essence Clarifying Milk</span> – Brightens, clarifies, and evens out skin tone for a polished, radiant finish.
            </li>
            <li>
              <span className="font-semibold">Exfoliating Black Soap</span> – Removes dead skin cells, deeply cleanses, and promotes skin rejuvenation.
            </li>
          </ul>
          <br />
          <p className="font-semibold">Why Choose Us?</p>
          <p>
            Our solutions are scientifically-backed and botanically formulated to nurture your skin without steroids or harsh chemicals. We’ve helped over 1,000 satisfied customers tackle dull skin and restore their skin to its true beauty.
          </p>
          <br />
          <p className="font-semibold">How to Use:</p>
          <ul className="list-disc pl-6">
            <li>Start with exfoliator to unclog pores, leave on for 20 minutes.</li>
            <li>Morning: Use your pH face wash, brand of moisturizer/Age-defying barrier serum, and sunscreen.</li>
            <li>Night: Exfoliating black soap, repair cream.</li>
          </ul>
          <br />
          <p>
            We’d love to hear about your progress! Don’t forget to send us a review and spread the word once you start seeing results.
          </p>
          <br />
          <p>
            Got more questions? We’re always here to help— Send us a chat on{" "}
            <a
              href="https://wa.me/message/LHXK3SHVMU6YC1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              WhatsApp
            </a>
            .
          </p>
        </>
      ),
    },
    {
      title: "What is the difference between African sea salt exfoliator & Botanical exfoliator?",
      content: (
        <>
          <p>
            The key difference between the two exfoliators lies in their focus and benefits:
          </p>
          <br />
          <ul className="list-disc pl-6">
            <li>
              <span className="font-semibold">The Botanical Exfoliator</span> is specially crafted for sensitive and acne-prone skin, offering gentle relief for active acne.
            </li>
            <li>
              <span className="font-semibold">The African Sea Salt Exfoliator</span> is a luxe option that tackles tough, clogged pores, enhances product absorption, combats hyperpigmentation, and delivers an instant, radiant finish.
            </li>
          </ul>
          <br />
          <p className="font-semibold">How to Use:</p>
          <p>
            Apply exfoliator on damp skin and massage into pores. Leave on for 20 minutes and wash off. Exfoliator should only be used two to three times a week.
          </p>
          <br />
          <p>
            Got more questions? We’re always here to help— Send us a chat on{" "}
            <a
              href="https://wa.me/message/LHXK3SHVMU6YC1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              WhatsApp
            </a>
            .
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {accordionItems.map((item, index) => (
        <div key={index} className="bg-white rounded-lg overflow-hidden">
          <div
            onClick={() => handleToggle(index)}
            className="flex items-center justify-between p-4 cursor-pointer bg-white hover:bg-gray-50"
          >
            <h2 className="text-[12px] font-bold lg:leading-[32px] lg:text-[20px] font-unbounded text-[#212121]">
              {item.title}
            </h2>
            <span>
              {openIndex === index ? (
                <FaChevronUp className="text-xl" />
              ) : (
                <FaChevronDown className="text-xl" />
              )}
            </span>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? "max-h-[1500px] p-4" : "max-h-0"
            }`}
          >
            <div className="text-xs font-unbounded lg:text-lg font-normal">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccordionSection;