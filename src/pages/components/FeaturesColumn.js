// FeaturesColumn.js
import React from 'react';

const FeaturesColumn = ({ item, editModeItemId, handleFieldChange }) => {
    const renderFeatures = () => {
        if (item.type === 1) {
            return (
                <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-4">Car Features</h3>

                    <div className="grid grid-cols-1 gap-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="sporty"
                                checked={item.sporty}
                                onChange={handleFieldChange}
                                className="form-checkbox"
                            />
                            <span>Sporty</span>
                        </label>

                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="economic"
                                checked={item.economic}
                                onChange={handleFieldChange}
                                className="form-checkbox"
                            />
                            <span>Economic</span>
                        </label>

                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="autoTransmission"
                                checked={item.autoTransmission}
                                onChange={handleFieldChange}
                                className="form-checkbox"
                            />
                            <span>Auto Transmission</span>
                        </label>

                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="manualTransmission"
                                checked={item.manualTransmission}
                                onChange={handleFieldChange}
                                className="form-checkbox"
                            />
                            <span>Manual Transmission</span>
                        </label>

                        <label className="flex items-center space-x-2">
                            <span>Seat Number</span>
                            <input
                                type="number"
                                name="seatNo"
                                value={item.seat_no}
                                onChange={handleFieldChange}
                                className="border rounded-md p-2 w-full"
                            />
                        </label>

                        <label className="flex items-center space-x-2">
                            <span>Brand</span>
                            <input
                                type="text"
                                name="brand"
                                value={item.brand}
                                onChange={handleFieldChange}
                                className="border rounded-md p-2 w-full"
                            />
                        </label>

                        <label className="flex items-center space-x-2">
                            <span>Transmission</span>
                            <input
                                type="text"
                                name="transmission"
                                value={item.transmission}
                                onChange={handleFieldChange}
                                className="border rounded-md p-2 w-full"
                            />
                        </label>

                        <label className="flex items-center space-x-2">
                            <span>Color</span>
                            <input
                                type="text"
                                name="color"
                                value={item.color}
                                onChange={handleFieldChange}
                                className="border rounded-md p-2 w-full"
                            />
                        </label>

                        <label className="flex items-center space-x-2">
                            <span>Fuel</span>
                            <input
                                type="text"
                                name="fuel"
                                value={item.fuel}
                                onChange={handleFieldChange}
                                className="border rounded-md p-2 w-full"
                            />
                        </label>

                        <label className="flex items-center space-x-2">
                            <span>Make</span>
                            <input
                                type="text"
                                name="make"
                                value={item.make}
                                onChange={handleFieldChange}
                                className="border rounded-md p-2 w-full"
                            />
                        </label>
                    </div>
                </div>
            );
        } else if (item.type === 2 || item.type === 3) {
            return (
                <div>
                    <label>Parking: </label>
                    <input
                        type="checkbox"
                        name="parking"
                        checked={item.parking}
                        onChange={(e) => handleFieldChange('parking', item.id, e.target.checked)}
                    />
                    <label>Pet Friendly: </label>
                    <input
                        type="checkbox"
                        name="petFriendly"
                        checked={item.pet_friendly}
                        onChange={(e) => handleFieldChange('petFriendly', item.id, e.target.checked)}
                    />
                    <label>Modern Style: </label>
                    <input
                        type="checkbox"
                        name="modernStyle"
                        checked={item.modern_style}
                        onChange={(e) => handleFieldChange('modernStyle', item.id, e.target.checked)}
                    />
                    <label>Patio Space: </label>
                    <input
                        type="checkbox"
                        name="patioSpace"
                        checked={item.patio_space}
                        onChange={(e) => handleFieldChange('patioSpace', item.id, e.target.checked)}
                    />
                    <label>Swimming Pool: </label>
                    <input
                        type="checkbox"
                        name="swimmingPool"
                        checked={item.swimming_pool}
                        onChange={(e) => handleFieldChange('swimmingPool', item.id, e.target.checked)}
                    />
                    <label>Room Number: </label>
                    <input
                        type="number"
                        name="roomNo"
                        value={item.room_no}
                        onChange={(e) => handleFieldChange('roomNo', item.id, e.target.value)}
                        className="border rounded-md p-2 w-full"
                    />
                    {/* Add other property features */}
                </div>
            );
        } else {
            return null;
        }
    };

    return <td className="border p-2">{editModeItemId === item.id ? renderFeatures() : 'Click update to view and edit features'}</td>;
};

export default FeaturesColumn;
