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
                                onChange={() => handleFieldChange('sporty', item.id, !item.sporty)}
                                className="form-checkbox"
                                disabled={editModeItemId !== item.id}
                            />
                            <span>Sporty</span>
                        </label>

                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="economic"
                                checked={item.economic}
                                onChange={() => handleFieldChange('economic', item.id, !item.economic)}
                                className="form-checkbox"
                                disabled={editModeItemId !== item.id}
                            />
                            <span>Economic</span>
                        </label>

                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="autoTransmission"
                                checked={item.autoTransmission}
                                onChange={() => handleFieldChange('auto_transmission', item.id, !item.autoTransmission)}
                                className="form-checkbox"
                                disabled={editModeItemId !== item.id}
                            />
                            <span>Auto Transmission</span>
                        </label>

                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="manualTransmission"
                                checked={item.manualTransmission}
                                onChange={() => handleFieldChange('manualTransmission', item.id, !item.manualTransmission)}
                                className="form-checkbox"
                                disabled={editModeItemId !== item.id}
                            />
                            <span>Manual Transmission</span>
                        </label>

                        <label className="flex items-center space-x-2">
                            <span>Seat Number</span>
                            <input
                                type="number"
                                name="seatNo"
                                value={item.seat_no}
                                onChange={(e) => handleFieldChange('seat_no', item.id, e.target.value)}
                                className="border rounded-md p-2 w-full"
                                disabled={editModeItemId !== item.id}
                            />
                        </label>

                        <label className="flex items-center space-x-2">
                            <span>Brand</span>
                            <input
                                type="text"
                                name="brand"
                                value={item.brand}
                                onChange={(e) => handleFieldChange('brand', item.id, e.target.value)}
                                className="border rounded-md p-2 w-full"
                                disabled={editModeItemId !== item.id}
                            />
                        </label>

                        <label className="flex items-center space-x-2">
                            <span>Transmission</span>
                            <input
                                type="text"
                                name="transmission"
                                value={item.transmission}
                                onChange={(e) => handleFieldChange('transmission', item.id, e.target.value)}
                                className="border rounded-md p-2 w-full"
                                disabled={editModeItemId !== item.id}
                            />
                        </label>

                        <label className="flex items-center space-x-2">
                            <span>Color</span>
                            <input
                                type="text"
                                name="color"
                                value={item.color}
                                onChange={(e) => handleFieldChange('color', item.id, e.target.value)}
                                className="border rounded-md p-2 w-full"
                                disabled={editModeItemId !== item.id}
                            />
                        </label>

                        <label className="flex items-center space-x-2">
                            <span>Fuel</span>
                            <input
                                type="text"
                                name="fuel"
                                value={item.fuel}
                                onChange={(e) => handleFieldChange('fuel', item.id, e.target.value)}
                                className="border rounded-md p-2 w-full"
                                disabled={editModeItemId !== item.id}
                            />
                        </label>

                        <label className="flex items-center space-x-2">
                            <span>Make</span>
                            <input
                                type="text"
                                name="make"
                                value={item.make}
                                onChange={(e) => handleFieldChange('make', item.id, e.target.value)}
                                className="border rounded-md p-2 w-full"
                                disabled={editModeItemId !== item.id}
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
                        onChange={() => handleFieldChange('parking', item.id, !item.parking)}
                        disabled={editModeItemId !== item.id}
                    />
                    <label>Pet Friendly: </label>
                    <input
                        type="checkbox"
                        name="petFriendly"
                        checked={item.pet_friendly}
                        onChange={() => handleFieldChange('pet_friendly', item.id, !item.pet_friendly)}
                        disabled={editModeItemId !== item.id}
                    />
                    <label>Modern Style: </label>
                    <input
                        type="checkbox"
                        name="modernStyle"
                        checked={item.modern_style}
                        onChange={() => handleFieldChange('modern_style', item.id, !item.modern_style)}
                        disabled={editModeItemId !== item.id}
                    />
                    <label>Patio Space: </label>
                    <input
                        type="checkbox"
                        name="patioSpace"
                        checked={item.patio_space}
                        onChange={() => handleFieldChange('patio_Space', item.id, !item.patio_space)}
                        disabled={editModeItemId !== item.id}
                    />
                    <label>Swimming Pool: </label>
                    <input
                        type="checkbox"
                        name="swimmingPool"
                        checked={item.swimming_pool}
                        onChange={() => handleFieldChange('swimming_pool', item.id, !item.swimming_pool)}
                        disabled={editModeItemId !== item.id}
                    />
                    <label>Room Number: </label>
                    <input
                        type="number"
                        name="roomNo"
                        value={item.room_no}
                        onChange={(e) => handleFieldChange('room_no', item.id, e.target.value)}
                        className="border rounded-md p-2 w-full"
                        disabled={editModeItemId !== item.id}
                    />
                </div>
            );
        } else {
            return null;
        }
    };

    return <td className="border p-2">{editModeItemId === item.id ? renderFeatures() : 'Click update to view and edit features'}</td>;
};

export default FeaturesColumn;
