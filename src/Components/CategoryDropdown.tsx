import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { CategoryDropdownProps } from '../Types/CategoryDropdownProps';

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ categories, field, form }) => {
    const handleSelect = (eventKey: string | null) => {
        form.setFieldValue(field.name, eventKey);
    };

    return (
        <DropdownButton id="dropdown-basic-button" title={form.values[field.name] || "Select Category"} onSelect={handleSelect}>
            {categories.map((category, index) => (
                <Dropdown.Item key={index} eventKey={category}>
                    {category}
                </Dropdown.Item>
            ))}
        </DropdownButton>
    );
};

export default CategoryDropdown;
