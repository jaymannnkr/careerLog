"use client";

import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [userId, setUserId] = useState("");
  const router = useRouter();

  return (
    <div className="flex h-dvh select-none flex-col items-center justify-center overflow-auto">
      <section className="flex flex-col items-center">
        <div className="text-sm">기록. 발견. 성장</div>
        <div className="text-[40px] font-semibold">커리어 로그</div>
      </section>
      <section className="mt-[80px] flex flex-col items-center">
        <div className="ml-7 flex items-center">
          <div className="rounded-2xl bg-white px-4 py-3">
            <input
              className="w-[150px] text-center text-lg outline-none placeholder:text-gray-300"
              type="text"
              placeholder="아이디를 입력하세요"
              style={{
                border: "none",
              }}
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
              }}
            />
          </div>
          <button
            type="button"
            className={`ml-2 ${userId ? "text-blue-500" : "text-gray-300"}`}
            onClick={() => {
              signIn("credentials", {
                id: userId,
                redirect: false,
              }).then(async (res) => {
                console.log(res);
                if (res?.ok) {
                  console.log("로그인 성공");
                  location.href = "/home";
                  history.replaceState(null, "", "/home");
                } else {
                  alert("로그인 실패");
                  console.log("로그인 실패");
                }
              });
            }}
          >
            <ArrowUpCircleIcon className="h-8 w-8" />
          </button>
        </div>
        <div
          className="underline-offset-3 mt-3 cursor-pointer text-gray-400 underline"
          onClick={() => {
            router.push("/signup");
          }}
        >
          처음이신가요?
        </div>
      </section>
    </div>
  );
}
