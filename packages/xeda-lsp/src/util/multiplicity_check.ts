/**
 * 
 * @param nuclear_charge 核电荷数
 * @param molecular_charge 分子电荷数
 * @param multiplicity 自旋多重度。整数代表alpha，负数代表beta
 * @returns 不合理会返回false，否则返回alpha和beta自旋电子数
 */
export function multiplicity(nuclear_charge: number, molecular_charge: number, multiplicity: number) {
    let abs_multiplicity = Math.abs(multiplicity);
    let electron_count = nuclear_charge - molecular_charge;
    let α_spin_electron_count = (electron_count + abs_multiplicity - 1) / 2;
    if (!Number.isInteger(α_spin_electron_count)) {
        return false;
    }

    let β_spin_electron_count = (electron_count - abs_multiplicity + 1) / 2;
    if (!Number.isInteger(β_spin_electron_count)) {
        return false;
    }

    if (multiplicity > 0) {
        return {
            α_spin_electron_count: α_spin_electron_count,
            β_spin_electron_count: β_spin_electron_count
        };
    } else {
        return {
            α_spin_electron_count: β_spin_electron_count,
            β_spin_electron_count: α_spin_electron_count
        };
    }
}