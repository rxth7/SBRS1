import { X, Calendar } from 'lucide-react';
import type { EventImage } from '../lib/eventImagesStore';

interface UpdateModalProps {
  item: EventImage;
  onClose: () => void;
}

export default function UpdateModal({ item, onClose }: UpdateModalProps) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full text-forest hover:bg-saffron hover:text-forest transition-all shadow-md"
        >
          <X size={20} />
        </button>

        <div className="aspect-video overflow-hidden rounded-t-2xl">
          <img
            src={item.src}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 md:p-8">
          {item.date && (
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={16} className="text-saffron" />
              <span className="font-poppins text-sm font-semibold text-saffron uppercase tracking-wide">
                {item.date}
              </span>
            </div>
          )}
          <h3 className="font-playfair text-2xl md:text-3xl font-bold text-slate mb-4">
            {item.title}
          </h3>
          <p className="font-poppins text-gray-600 leading-relaxed text-base">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}
