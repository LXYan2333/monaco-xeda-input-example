export function multiplicity(nuclear_charge: number, molecular_charge: number, multiplicity: number) {
    let electron_count = nuclear_charge - molecular_charge;
    let α_spin_electron_count = (electron_count + multiplicity - 1) / 2;
    if (!Number.isInteger(α_spin_electron_count)) {
        return false;
    }

    let β_spin_electron_count = (electron_count - multiplicity + 1) / 2;
    if (!Number.isInteger(β_spin_electron_count)) {
        return false;
    }

    return {
        α_spin_electron_count: α_spin_electron_count,
        β_spin_electron_count: β_spin_electron_count
    };
}