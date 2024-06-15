import { Progress } from "@/components/ui/progress";

export default function Rating() {
  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex flex-row gap-3">
        5 <Progress value={50} />
      </div>
      <div className="flex flex-row gap-3">
        4 <Progress value={33} />
      </div>
      <div className="flex flex-row gap-3">
        3 <Progress value={70} />
      </div>
      <div className="flex flex-row gap-3">
        2 <Progress value={33} />
      </div>
      <div className="flex flex-row gap-3">
        1 <Progress value={33} />
      </div>
    </div>
  );
}
