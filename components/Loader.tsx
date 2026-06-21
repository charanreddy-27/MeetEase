const Loader = () => {
  return (
    <div className="flex h-[60vh] w-full items-center justify-center">
      <div className="relative flex items-center justify-center">
        <div className="absolute size-16 animate-ping rounded-full bg-primary-500/20" />
        <div className="size-12 animate-spin rounded-full border-4 border-secondary-700 border-t-primary-500" />
      </div>
    </div>
  );
};

export default Loader;
