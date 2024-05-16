import Link from "next/link";
import React from "react";

const Collections = () => {
  return (
    <div className="w-full border flex flex-col gap-3 px-2 pb-4">
      <h3 className="text-lg p-1  border-b">Collections</h3>

      {/* Here collections Links will be dynamically render on the basis of total Collections in the database */}
      {["Basketball shoes", "Running shoes", "Soccer shoes"].map(
        (item, index) => (
          <Link
            className="text-sm text-primary/80 hover:text-accent "
            href={`/${item.toLocaleLowerCase()}`}
            key={index}
          >
            {item}
          </Link>
        )
      )}
    </div>
  );
};
export default Collections;
