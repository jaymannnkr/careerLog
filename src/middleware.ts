import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

// function isPublicAPI(req: NextRequest) {
//   return req.nextUrl.pathname.startsWith("/api/public/");
// }

export default withAuth(
  function middleware(req: NextRequest) {
    // console.debug("middleware: ", req.url);
    // console.debug(req.nextauth.token);
    ////////////////////// 클라이언트 IP 가져오기 //////////////////////
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");

    let clientIp = forwardedFor ? forwardedFor.split(",")[0] : realIp || req.ip;

    // 기존 응답에 IP 정보 추가
    const res = NextResponse.next();
    res.headers.set("X-Client-IP", String(clientIp));
    ////////////////////// 클라이언트 IP 가져오기 . //////////////////////

    ////////////////////// 사용자 에이전트 정보 가져오기 //////////////////////
    const userAgent = req.headers.get("user-agent") || "Unknown";
    res.headers.set("x-custom-user-agent", userAgent);
    ////////////////////// 사용자 에이전트 정보 가져오기 . //////////////////////

    ////////////////////// 호스트 정보 가져오기 (요청한 도메인 주소) //////////////////////
    const host = req.headers.get("host") || "Unknown Host";
    res.headers.set("x-custom-host", host);
    ////////////////////// 호스트 정보 가져오기 (요청한 도메인 주소) . //////////////////////

    // 추가 정보를 헤더에 포함 (선택사항)
    // res.headers.set('X-Request-Path', req.nextUrl.pathname);

    return res;
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // if (isPublicAPI(req)) {
        //   // 퍼블릭 api 요청은 인증 스킵
        //   return true;
        // }
        return token ? true : false;
      },
    },
  },
);

/** 로그인 인증 제외 목록 */
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|auth|authentication|signup|login|alert|error).*)", // 미들웨어 제외
  ],
};
