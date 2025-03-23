"use client";

import { Scribble } from "@/components/Scribble";

export const Hero = () => {
    return (
        <div className="py-20">
            <h1
                className={
                    "font-heading text-5xl text-primary tracking-widest"
                }
            >
                EMMA&apos;S JOURNAL
            </h1>
            <p className={"font-serif text-foreground max-w-96 text-2xl font-semibold"}>
                A Collection of Thoughts &{"\n"} Notes by Emma Campbell
            </p>
            <Scribble className={""} />
        </div>
    );
};
