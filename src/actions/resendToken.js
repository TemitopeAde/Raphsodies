
import { sendVerificationEmail } from "@/utils/sendVerification";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function resendVerificationEmail(email) {
  try {

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.isVerified) {
      throw new Error("User is already verified");
    }

    const newVerificationToken = crypto.randomBytes(32).toString("hex");

    await prisma.user.update({
      where: { email },
      data: { verificationToken: newVerificationToken },
    });

    await sendVerificationEmail(email, newVerificationToken);

    return { success: true, message: "Verification email resent successfully" };
  } catch (error) {
    console.error("Error resending verification email:", error.message);
    throw new Error(error.message || "Error resending verification email");
  }
}
