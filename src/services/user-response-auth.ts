import { menuFetch } from "@/config/axios";

export default function userResponseAuth() {
  const response = menuFetch.get("/user/response");
  return response;
}
