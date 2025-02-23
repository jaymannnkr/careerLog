"use client";

import Four from "./_components/Four";
import One from "./_components/One";
import { useStoreSignUp } from "./_components/StoreProvider";
import Three from "./_components/Three";
import Two from "./_components/Two";

export default function Page() {
  const { step } = useStoreSignUp();

  return (
    <div className="h-full w-full">
      {step === 1 ? <One /> : null}
      {step === 2 ? <Two /> : null}
      {step === 3 ? <Three /> : null}
      {step === 4 ? <Four /> : null}
    </div>
  );
}
