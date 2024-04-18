import { useEffect } from "react";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const useSupabaseRealtime = () => {
  const supabase = createClientComponentClient();

  useEffect(() => {
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "documents",
        },
        (payload) => {
          console.log("🟢 Realtime - INSERT!");
          console.log(payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return null;
};

export default useSupabaseRealtime;
