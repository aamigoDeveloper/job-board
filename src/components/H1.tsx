export default function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
      {children}
    </h1>
  )
}
