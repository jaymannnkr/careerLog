"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import CustomSlider from "../../_components/CustomSlider";
import { useStoreSignUp } from "./StoreProvider";
import { createUserJoin } from "../_actions/Four";
import { useRouter } from "next/navigation";

export default function Four() {
  const { inputInfo, setStep, setInputInfo } = useStoreSignUp();
  const router = useRouter();

  return (
    <div>
      <div className="my-5 flex w-full items-center justify-between px-2">
        <button
          className="inline-flex items-center text-blue-500"
          onClick={() => setStep(3)}
        >
          <ChevronLeftIcon className="h-5 w-5" /> <p>뒤로가기</p>
        </button>
        <button
          className="inline-flex items-center pr-2 font-semibold text-blue-500"
          onClick={async () => {
            const result = await createUserJoin(inputInfo);

            if (result === "fail") {
              alert("회원가입이 실패하였습니다.");
              return;
            }

            if (result === "success") {
              alert("회원가입이 완료되었습니다.");
              router.push("/login");
              setInputInfo({
                id: "",
                userName: "",
                orgName: "",
                importantElement: {
                  work: 0,
                  reward: 0,
                  grow: 0,
                  environment: 0,
                  relration: 0,
                  value: 0,
                },
                pointElement: {
                  work: 0,
                  reward: 0,
                  grow: 0,
                  environment: 0,
                  relration: 0,
                  value: 0,
                },
              });
              return;
            }
          }}
        >
          <p>완료</p>
        </button>
      </div>
      <div className="px-4">
        <section className="flex flex-col text-xl">
          <span>
            {inputInfo.userName}님의 {inputInfo.orgName}에 대한
          </span>
          <span>요소별 만족도를 표시해주세요</span>
        </section>

        <section className="mt-10 flex flex-col items-center rounded-lg border bg-white p-4 drop-shadow-xl">
          <div className="inline-flex w-full items-center justify-between">
            <span className="inline-flex items-center">
              <p className="text-xl font-bold">현재 만족도</p>
            </span>
          </div>
          <div className="mt-5 w-full">
            <span className="inline-flex w-full items-center">
              <p className="w-[55px] text-lg font-semibold text-gray-600">
                업무
              </p>
              <span className="ml-1 w-full">
                <CustomSlider
                  value={inputInfo.pointElement.work}
                  max={100}
                  onChange={(value) => {
                    setInputInfo({
                      ...inputInfo,
                      pointElement: {
                        ...inputInfo.pointElement,
                        work: value,
                      },
                    });
                  }}
                />
              </span>
            </span>

            <span className="mt-5 inline-flex w-full items-center">
              <p className="w-[55px] text-lg font-semibold text-gray-600">
                보상
              </p>
              <span className="ml-1 w-full">
                <CustomSlider
                  value={inputInfo.pointElement.reward}
                  max={100}
                  onChange={(value) => {
                    setInputInfo({
                      ...inputInfo,
                      pointElement: {
                        ...inputInfo.pointElement,
                        reward: value,
                      },
                    });
                  }}
                />
              </span>
            </span>

            <span className="mt-5 inline-flex w-full items-center">
              <p className="w-[55px] text-lg font-semibold text-gray-600">
                성장
              </p>
              <span className="ml-1 w-full">
                <CustomSlider
                  value={inputInfo.pointElement.grow}
                  max={100}
                  onChange={(value) => {
                    setInputInfo({
                      ...inputInfo,
                      pointElement: {
                        ...inputInfo.pointElement,
                        grow: value,
                      },
                    });
                  }}
                />
              </span>
            </span>

            <span className="mt-5 inline-flex w-full items-center">
              <p className="w-[55px] text-lg font-semibold text-gray-600">
                환경
              </p>
              <span className="ml-1 w-full">
                <CustomSlider
                  value={inputInfo.pointElement.environment}
                  max={100}
                  onChange={(value) => {
                    setInputInfo({
                      ...inputInfo,
                      pointElement: {
                        ...inputInfo.pointElement,
                        environment: value,
                      },
                    });
                  }}
                />
              </span>
            </span>

            <span className="mt-5 inline-flex w-full items-center">
              <p className="w-[55px] text-lg font-semibold text-gray-600">
                관계
              </p>
              <span className="ml-1 w-full">
                <CustomSlider
                  value={inputInfo.pointElement.relration}
                  max={100}
                  onChange={(value) => {
                    setInputInfo({
                      ...inputInfo,
                      pointElement: {
                        ...inputInfo.pointElement,
                        relration: value,
                      },
                    });
                  }}
                />
              </span>
            </span>

            <span className="mt-5 inline-flex w-full items-center">
              <p className="w-[55px] text-lg font-semibold text-gray-600">
                가치
              </p>
              <span className="ml-1 w-full">
                <CustomSlider
                  value={inputInfo.pointElement.value}
                  max={100}
                  onChange={(value) => {
                    setInputInfo({
                      ...inputInfo,
                      pointElement: {
                        ...inputInfo.pointElement,
                        value: value,
                      },
                    });
                  }}
                />
              </span>
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
