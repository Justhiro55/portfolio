"use client";
import { TextGenerateEffect } from "./TextGenerateEffect";

interface HeroAnimatedProps {
  fullName: string;
}

export const HeroTitle = ({ fullName }: HeroAnimatedProps) => {
  return (
    <TextGenerateEffect
      words={`Hi, I'm ${fullName}`}
      className="text-4xl font-bold mb-4"
      duration={0.4}
    />
  );
};
