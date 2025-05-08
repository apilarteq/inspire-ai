'use client';

export default function Error() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <main className="grid min-h-screen place-items-center bg-primary px-6 py-24 sm:py-32 lg:px-8">
    <div className="text-center">
      <p className="text-base font-semibold text-secondary">500</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-300 sm:text-7xl">
        Something went wrong
      </h1>
      <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
        Sorry, a server side error ocurred.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <button
        onClick={handleReload}
          className="rounded-md bg-secondary px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs cursor-pointer"
        >
          Reload
        </button>
      </div>
    </div>
  </main>
  );
}
