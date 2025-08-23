import {
  Palette,
  Box,
  Monitor,
  Figma,
  Layout,
  Smartphone,
  BarChart3,
  Type,
} from "lucide-react";

const categories = [
  {
    icon: Palette,
    title: "Illustrations",
    description: "Dimensional elements",
    iconColor: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    icon: Box,
    title: "3D Assets",
    description: "Immersive elements",
    iconColor: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    icon: Monitor,
    title: "Framer Templates",
    description: "Easy-to-edit websites",
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: Figma,
    title: "Figma Templates",
    description: "User interfaces",
    iconColor: "text-gray-600",
    bgColor: "bg-gray-50",
  },
  {
    icon: Layout,
    title: "UX / UI Kits",
    description: "Design with purpose",
    iconColor: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    icon: Smartphone,
    title: "Mockups",
    description: "Realistic display devices",
    iconColor: "text-gray-500",
    bgColor: "bg-gray-50",
  },
  {
    icon: BarChart3,
    title: "Graphics",
    description: "Create stunning visuals",
    iconColor: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    icon: Type,
    title: "Fonts",
    description: "Expressive typography",
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
  },
];

export function ResourceList() {
  return (
    <div className="max-w-6xl flex-1 text-foreground mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold ">Top categories</h2>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <div
              key={index}
              className="group p-4  rounded-lg border border-border bg-background hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${category.bgColor}`}>
                  <IconComponent className={`w-5 h-5 ${category.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {category.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
