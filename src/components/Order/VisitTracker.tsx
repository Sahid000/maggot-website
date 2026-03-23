"use client";

import { useEffect } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

const VisitTracker = ({ page }: { page: string }) => {
  useEffect(() => {
    fetch(`${BASE_URL}/analytics/track-visit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page }),
    }).catch(() => {});
  }, [page]);

  return null;
};

export default VisitTracker;
