"use server";

import { prismaClient } from "@/lib/prisma/client";
import { InputInfo } from "../../_lib/types";

/** 회원 가입 (초기세팅) */
export async function createUserJoin(inputInfo: InputInfo) {
  const tresult = await prismaClient.$transaction(async (tx) => {
    try {
      // 유저 생성
      const createUser = await tx.user.create({
        data: {
          id: inputInfo.id,
          name: inputInfo.userName,
          org: inputInfo.orgName,
        },
      });

      const [createImportantElements, createCurrentSatisfaction] =
        await Promise.all([
          // 요소별 중요도 생성
          tx.importantElements.create({
            data: {
              userSeq: createUser.seq,
              work: inputInfo.importantElement.work,
              reward: inputInfo.importantElement.reward,
              grow: inputInfo.importantElement.grow,
              environment: inputInfo.importantElement.environment,
              relration: inputInfo.importantElement.relration,
              value: inputInfo.importantElement.value,
            },
          }),
          // 요소별 현재 만족도 생성
          tx.currentSatisfaction.create({
            data: {
              userSeq: createUser.seq,
              work: inputInfo.pointElement.work,
              reward: inputInfo.pointElement.reward,
              grow: inputInfo.pointElement.grow,
              environment: inputInfo.pointElement.environment,
              relration: inputInfo.pointElement.relration,
              value: inputInfo.pointElement.value,
            },
          }),
        ]);

      return "success";
    } catch (e) {
      console.error(e);
      return "fail";
    }
  }, {});

  return tresult;
}
