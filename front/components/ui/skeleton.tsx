import { cn } from "../../lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  console.log(props);
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted flex justify-center content-center", className)}
      {...props}
    />
  )
}

export { Skeleton }
