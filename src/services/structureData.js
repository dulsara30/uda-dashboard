export const structureParticipants = (raw) => {
    const result = {};

    raw.forEach(entry => {
        const district = entry[" Select your district from the list below."]?.trim();
        const designation = entry["Select your current designation from the list or specify if other  "]?.trim();
        const fullName = entry["Please enter your full name as per official records"]?.trim();

        let authority = "";
        if (district === "Kandy") {
            authority = entry["Choose your local authority from the list below. Options will appear based on your selected district. (Kandy)"];
        } else if (district === "Matale") {
            authority = entry["Choose your local authority from the list below. Options will appear based on your selected district. (Matale)"];
        } else if (district === "Nuwara Eliya") {
            authority = entry["Choose your local authority from the list below. Options will appear based on your selected district. (Nuwara Eliya)"];
        }

        if (!district || !authority || !designation) return;

        // Init district
        if (!result[district]) {
            result[district] = {
                count: 0,
                authorities: {}
            };
        }

        // Init authority
        if (!result[district].authorities[authority]) {
            result[district].authorities[authority] = {
                count: 0,
                designations: {}
            };
        }

        // Init designation
        if (!result[district].authorities[authority].designations[designation]) {
            result[district].authorities[authority].designations[designation] = {
                count: 0,
                names: []
            };
        }

        // Increment counts and push name
        result[district].count += 1;
        result[district].authorities[authority].count += 1;
        result[district].authorities[authority].designations[designation].count += 1;
        result[district].authorities[authority].designations[designation].names.push(fullName);
    });

    return result;
};
