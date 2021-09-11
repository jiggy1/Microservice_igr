export function impotGeneralSurLeRevenu(idBeneficiaire, nombrePart=1, montantBrut, montantIS, montantCN) {
    let assiette;
    let rap;
    let xMontantBrutImposable;
    let montantIGR;

    // Determiner l'age du bénéficiaire
    let ageBeneficiaire;

    if (ageBeneficiaire > 70) {
        montantIGR = 0;
        assiette = 0;
        rap = 0;

    } else if (ageBeneficiaire <= 70) {

        if (montantBrut <= 300_000) {
            montantIGR = 0;
            assiette = 0;
            rap = 0;

        } else if (montantBrut > 300_000) {
            // Prise en compte de l'abatement de 20%
            xMontantBrutImposable = Math.round(montantBrut - 300_000);

            assiette = ((xMontantBrutImposable * 0.8) - (montantIS + montantCN)) * 0.85;
            rap = (assiette/nombrePart)
        }
    } 
    if (rap < 25000) {
        montantIGR = 0;

    } else if(rap > 25000 && rap < 45583) {
        montantIGR = Math.round((assiette*(10/110))-(2273*nombrePart));

    } else if (rap > 45584 && rap < 81583) {
        montantIGR = Math.round((assiette*(15/115))-(4076*nombrePart));

    } else if (rap > 81584 && rap < 126583) {
        montantIGR = Math.round((assiette*(20/120))-(7031*nombrePart));

    } else if (rap > 126584 && rap < 220333) {
        montantIGR = Math.round((assiette*(25/125))-(11250*nombrePart));

    }else if (rap > 220334 && rap < 389083) {
        montantIGR = Math.round((assiette*(35/135))-(24306*nombrePart));

    }else if (rap > 389084 && rap < 842166) {
        montantIGR = Math.round((assiette*(45/145))-(44181*nombrePart));

    } else if (rap > 842167) {
        montantIGR = Math.round((assiette*(60/160))-(98633*nombrePart));
    }

    return montantIGR;
}


