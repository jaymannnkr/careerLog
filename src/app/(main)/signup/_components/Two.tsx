"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Input } from "rsuite";
import { useStoreSignUp } from "./StoreProvider";

export default function Two({}: {}) {
  const { setStep, inputInfo, setInputInfo } = useStoreSignUp();

  return (
    <div>
      <div className="my-5 flex w-full items-center justify-between px-2">
        <button
          className="inline-flex items-center text-blue-500"
          onClick={() => setStep(1)}
        >
          <ChevronLeftIcon className="h-5 w-5" /> <p>뒤로가기</p>
        </button>
        <button
          className="inline-flex items-center text-blue-500"
          onClick={() => setStep(3)}
        >
          <p>다음</p> <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
      <section className="flex flex-col pl-2">
        <p className="text-2xl font-semibold">아이디</p>
        <div className="mt-2 px-4">
          <Input
            placeholder="아이디"
            size="lg"
            value={inputInfo.id}
            onChange={(e) => {
              setInputInfo({ ...inputInfo, id: e });
            }}
          />
        </div>
      </section>
    </div>
  );
}
