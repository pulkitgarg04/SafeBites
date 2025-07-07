import Skeleton from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      <div className="flex w-full max-w-lg flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <Skeleton style={{ width: 48, height: 48 }} className="mb-2" />
          <Skeleton style={{ width: 100, height: 24 }} />
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton style={{ width: "100%", height: 48 }} />
          <Skeleton style={{ width: "100%", height: 48 }} />
          <Skeleton style={{ width: "100%", height: 48 }} />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton style={{ width: "60%", height: 20 }} />
          <Skeleton style={{ width: "40%", height: 20 }} />
        </div>
      </div>
    </div>
  );
}