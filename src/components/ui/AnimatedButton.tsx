"use client";
import { MovingBorderButton } from "./MovingBorder";

interface AnimatedButtonProps {
  href: string;
  children: React.ReactNode;
}

export const AnimatedButton = ({ href, children }: AnimatedButtonProps) => {
  return (
    <MovingBorderButton
      as="a"
      href={href}
      borderRadius="0.5rem"
      className="px-4 py-2 font-medium text-brand-green"
      containerClassName="inline-block"
      duration={3000}
    >
      {children}
    </MovingBorderButton>
  );
};
