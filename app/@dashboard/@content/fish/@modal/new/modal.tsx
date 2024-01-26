"use client";

import { Modal as AntdModal } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Modal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open && pathname === "/fish/new") {
      setOpen(true);
    }
  }, [open, pathname]);

  return (
    <AntdModal
      open={open}
      destroyOnClose
      onCancel={() => {
        setOpen(false);
        setTimeout(() => {
          router.replace("/fish");
        }, 400);
      }}
    >
      xxx
    </AntdModal>
  );
};
