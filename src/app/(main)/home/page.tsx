"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { data } = useSession();
  const router = useRouter();
  console.log(data?.token);

  return (
    <div className="flex h-dvh flex-col items-center justify-center overflow-auto">
      홈 화면 (로그인 성공){" "}
      <button
        className="mt-5 rounded-md border bg-white p-2"
        onClick={() => {
          signOut();
          router.push("/login");
        }}
      >
        로그아웃
      </button>
    </div>
  );
}
