import React from 'react';
import { 
  Apple, 
  Beef, 
  Cookie, 
  Dog, 
  Sparkles, 
  Milk, 
  Flame, 
  Egg, 
  CupSoda, 
  Sparkle, 
  ChevronRight 
} from 'lucide-react';

const IconMap = {
  Apple: Apple,
  Beef: Beef,
  Cookie: Cookie,
  Dog: Dog,
  Sparkles: Sparkles,
  Milk: Milk,
  Flame: Flame,
  Egg: Egg,
  CupSoda: CupSoda,
  Sparkle: Sparkle,
};

const Sidebar = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <aside className="sidebar-container">
      <ul className="category-list">
        {categories.map((category) => {
          const IconComponent = IconMap[category.icon] || Sparkles;
          const isActive = activeCategory === category.name;

          return (
            <li 
              key={category.name}
              className={`category-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(isActive ? null : category.name)} // toggle category filter
            >
              <div className="category-item-left">
                <IconComponent className="category-icon" />
                <span>{category.name}</span>
              </div>
              <ChevronRight className="category-arrow" />
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
