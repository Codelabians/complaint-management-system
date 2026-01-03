import { Plus } from "lucide-react";

const AddButton = ({ 
  onClick, 
  text = 'Create New',
  icon: Icon = Plus,
//   bgColor = colors.greenPrimary,
//   hoverColor = colors.greenLight,
  textColor = '#ffffff',
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg text-white ${className}`}
    //   style={{ backgroundColor: bgColor, color: textColor }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverColor}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = bgColor}
    >
      <Icon size={20} />
      {text}
    </button>
  );
};

export default AddButton;