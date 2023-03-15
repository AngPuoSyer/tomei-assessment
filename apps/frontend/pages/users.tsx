import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { visit } from "../redux/visitedUser";

export default function UsersPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(visit());
  }, []);
  const queryClient = useQueryClient();
  const users = useQuery({
    queryKey: ["allUsers"],
    queryFn: (val) => {
      return axios.get("http://localhost:8000/user/all");
    },
    onSuccess: (val) => console.log(val),
  });
  return (
    <div className="w-full">
      <div className="mx-auto my-8 md:my-12">
        <Link href="/">
          <img src="/Logo.png" className="mx-auto" />
        </Link>
      </div>
      <div className="w-9/12 mx-auto mt-8">
        {users.data &&
          (users.data as any).data.map((val: any) => {
            return (
              <>
                <div className="flex gap-20 h-24">
                  <img
                    className="w-22 h-22"
                    src={`${
                      `http://localhost:8000/public/${val.avatar}` ||
                      "Avatar.png"
                    }`}
                  />
                  <div>
                    <p>Name: {val.name}</p>
                    <p>Email: {val.email}</p>
                    <p>Created At: {val.createdAt}</p>
                  </div>
                </div>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
              </>
            );
          })}
      </div>
    </div>
  );
}
