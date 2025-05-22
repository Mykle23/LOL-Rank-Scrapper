import { FaCopy } from 'react-icons/fa';
import { useToast } from '../Toast/Toaster';

interface CopyButtonProps {
  text: string;
  label: string;
  children?: React.ReactNode;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text, label, children }) => {
  const { showToast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`${label} copied to clipboard`, 'success');
    } catch (err) {
      showToast('Failed to copy to clipboard', 'error');
    }
  };

  return (
    <div className="group relative">
      <button
        onClick={copyToClipboard}
        className="text-text-primary hover:text-electric-blue transition-colors flex items-center gap-2"
      >
        {children}
        <FaCopy className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
      <div className="absolute left-0 -bottom-1 w-full h-0.5 bg-electric-blue transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
    </div>
  );
}; 