

export default async function Home() {

  return (
    <main className="max-w-5xl m-auto my-10 px-3 space-y-10">
      <div className="text-center space-y-5">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">All developer jobs</h1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <aside className="w-[30%]">Filter jobs</aside>
      </section>
    </main>
  )
}
