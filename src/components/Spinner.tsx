type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
};

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-5 w-5 border-2',
  lg: 'h-7 w-7 border-[3px]',
};

export default function Spinner({
  size = 'md',
  label,
  className = '',
}: SpinnerProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className={`${sizeClasses[size]} inline-block animate-spin rounded-full border-white/20 border-t-sky-300`}
        aria-hidden="true"
      />
      {label ? <span>{label}</span> : null}
    </span>
  );
}