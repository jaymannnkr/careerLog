"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useCallback, useRef, useState } from "react";
import { useStoreSignUp } from "./StoreProvider";
import CustomSlider from "../../_components/CustomSlider";

export default function Three() {
  const { inputInfo, setStep, setInputInfo } = useStoreSignUp();

  /** 최대 중요도 */
  const maxImportantPoint = useRef(100).current;

  /** 남은 중요도 */
  const [remainPoint, setRemainPoint] = useState(maxImportantPoint);

  const handleSliderChange = useCallback(
    (key: string, newValue: number) => {
      const currentValues = inputInfo.importantElement;
      const otherValuesSum = Object.entries(currentValues)
        .filter(([k]) => k !== key)
        .reduce((sum, [, value]) => sum + value, 0);

      // 새로운 값을 포함한 총합이 totalPoint를 초과하면 변경 막기
      if (otherValuesSum + newValue > maxImportantPoint) {
        return;
      }

      // 남은 포인트 계산
      const remainPoint = maxImportantPoint - otherValuesSum - newValue;
      setRemainPoint(remainPoint);

      setInputInfo({
        ...inputInfo,
        importantElement: {
          ...inputInfo.importantElement,
          [key]: newValue,
        },
      });
    },
    [inputInfo, maxImportantPoint, setInputInfo],
  );

  return (
    <div>
      <div className="my-5 flex w-full items-center justify-between px-2">
        <button
          className="inline-flex items-center text-blue-500"
          onClick={() => setStep(2)}
        >
          <ChevronLeftIcon className="h-5 w-5" /> <p>뒤로가기</p>
        </button>
        <button
          className="inline-flex items-center text-blue-500"
          onClick={() => setStep(4)}
        >
          <p>다음</p> <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="px-4">
        <section className="flex flex-col text-xl">
          <span>직업만족도를 구성하는 6가지 요소입니다.</span>
          <span>각 요소의 중요도를 매겨주세요.</span>
        </section>

        <section className="mt-10 flex flex-col items-center rounded-lg border bg-white p-4 drop-shadow-xl">
          <div className="inline-flex w-full items-center justify-between">
            <span className="inline-flex items-center">
              <p className="text-xl font-bold">중요도</p>
              <InformationCircleIcon className="ml-1 h-5 w-5 text-gray-500" />
            </span>
            <span className="inline-flex items-baseline">
              <p className="text-sm">남은 중요도:</p>
              <span
                className={`ml-1 w-[28px] text-right ${remainPoint <= 0 ? "text-gray-500" : ""}`}
              >
                {remainPoint}
              </span>
            </span>
          </div>
          <div className="mt-5 w-full">
            <span className="inline-flex w-full items-center">
              <p className="w-[55px] text-lg font-semibold text-gray-600">
                업무
              </p>
              <span className="ml-1 w-full">
                <CustomSlider
                  value={inputInfo.importantElement.work}
                  onChange={(value) => handleSliderChange("work", value)}
                />
              </span>
            </span>

            <span className="mt-5 inline-flex w-full items-center">
              <p className="w-[55px] text-lg font-semibold text-gray-600">
                보상
              </p>
              <span className="ml-1 w-full">
                <CustomSlider
                  value={inputInfo.importantElement.reward}
                  onChange={(value) => handleSliderChange("reward", value)}
                />
              </span>
            </span>

            <span className="mt-5 inline-flex w-full items-center">
              <p className="w-[55px] text-lg font-semibold text-gray-600">
                성장
              </p>
              <span className="ml-1 w-full">
                <CustomSlider
                  value={inputInfo.importantElement.grow}
                  onChange={(value) => handleSliderChange("grow", value)}
                />
              </span>
            </span>

            <span className="mt-5 inline-flex w-full items-center">
              <p className="w-[55px] text-lg font-semibold text-gray-600">
                환경
              </p>
              <span className="ml-1 w-full">
                <CustomSlider
                  value={inputInfo.importantElement.environment}
                  onChange={(value) => handleSliderChange("environment", value)}
                />
              </span>
            </span>

            <span className="mt-5 inline-flex w-full items-center">
              <p className="w-[55px] text-lg font-semibold text-gray-600">
                관계
              </p>
              <span className="ml-1 w-full">
                <CustomSlider
                  value={inputInfo.importantElement.relration}
                  onChange={(value) => handleSliderChange("relration", value)}
                />
              </span>
            </span>

            <span className="mt-5 inline-flex w-full items-center">
              <p className="w-[55px] text-lg font-semibold text-gray-600">
                가치
              </p>
              <span className="ml-1 w-full">
                <CustomSlider
                  value={inputInfo.importantElement.value}
                  onChange={(value) => handleSliderChange("value", value)}
                />
              </span>
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
