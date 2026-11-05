import Image from "next/image";
import { SITE } from "@/lib/site";
import styles from "@/styles/site.module.css";

type BrandLogoProps = {
  size?: number;
  className?: string;
};

export function BrandLogo({ size = 28, className }: BrandLogoProps) {
  return (
    <Image
      className={className ?? styles.brandLogo}
      src="/logo.png"
      alt=""
      width={size}
      height={size}
      priority
      aria-hidden
    />
  );
}

export function BrandWordmark({
  size = 28,
  label = SITE.name,
}: {
  size?: number;
  label?: string;
}) {
  return (
    <>
      <BrandLogo size={size} />
      <span>{label}</span>
    </>
  );
}
