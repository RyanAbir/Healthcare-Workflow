import React, { type ReactNode } from "react";

type SectionCardProps = {
  title: string;
  children?: ReactNode;
};

export const SectionCard = ({ title, children }: SectionCardProps) => {
  return (
    <section className="section-card">
      <div className="section-card__head">
        <h2>{title}</h2>
      </div>
      <div className="section-card__body">{children}</div>
    </section>
  );
};
