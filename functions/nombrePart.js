export function nombreParts(idBeneficiaire) {
    let nombrePart;
    let nombreEnfant;
    let nombreEnfantMajeur;
    let xconjDeces;
    let nombreEnfantMajeurConjointDecede;
    
    
    // recupération dans la bd le sexe et la situation matrimoniale
    let sexe;
    

    
    
    if (nombreEnfant === 0 && nombreEnfantMajeur === 0) {
    
        if (sexe in ['M', 'F'] && situationMatrimoliale in ['D', 'V', 'C', 'S', 'I']) {
            nombrePart = 1;
        }
        if (sexe in ['M', 'F'] && situationMatrimoniale === 'M') {
            nombrePart = 2;
        }
    }



    // Cas presence d'au moins un enfant mineur

    if (nombreEnfant > 0) {
        if (sexe in ['M', 'F'] && situationMatrimoliale in ['C', 'D', 'S', 'I']) {
           switch (nombreEnfant) {
               case 1:
                   nombrePart = 2;
                   break;

                case 2:
                    nombrePart = 2.5;
                    break;

                case 3:
                    nombrePart = 3;
                    break;

                case 4:
                    nombrePart = 3.5;
                    break;


                case 5:
                    nombrePart = 4;
                    break;

                case 6:
                    nombrePart = 4.5;
                    break;

                // pour nombreEnfant >= 7
                default:
                    nombrePart = 5;
                    break;

                
           } 

        } else if (sexe in ['M', 'F'] && situationMatrimoliale in ['M', 'V']) {
            switch (nombreEnfant) {
                case 1:
                    nombrePart = 2.5;
                    break;
            
                case 2:
                    nombrePart = 3;
                    break;

                case 3:
                    nombrePart = 3.5;
                    break;

                case 4:
                    nombrePart = 4;
                    break;

                case 5:
                    nombrePart = 4.5;
                    break;

                // pour nombreEnfant >= 6
                default:
                    nombrePart = 5;
                    break;
            }

        }
    }

    // cas assure celibataire ou divorce n'ayant plus d'enfant a charge / plus d'enfants mineur

    if (nombreEnfant === 0 && nombreEnfantMajeur > 0) {
        if (sexe in ['M', 'F'] && situationMatrimoliale in ['D', 'V', 'C', 'S', 'I']) {
            nombrePart = 1.5; 
        }

        if (sexe in ['M', 'F'] && situationMatrimoliale === 'M') {
            nombrePart = 2;
        }
    }

    // cas conjoint decede d'un assure avec enfant a charge issus du mariage avec le conjoint decede

    if (xconjDeces >= 1 && nombreEnfantMajeurConjointDecede > 0 && nombreEnfantConjointDecede === 0) {

        if (sexe in ['M', 'F'] && situationMatrimoniale === 'V' && xconjDeces >= 1) {

            switch (nombreEnfantMajeurConjointDecede) {
                case 1:
                    nombrePart = 2.5;
                    break;

                case 2:
                    nombrePart = 3;
                    break;

                case 3:
                    nombrePart = 3.5;
                    break;

                case 4:
                    nombrePart = 4;
                    break;

                case 5:
                    nombrePart = 4.5;
                    break;

                // nombreEnfantMajeurConjointDecede >= 6
                default:
                    nombrePart = 5;
                    break;
            }
        }
    }

    // cas conjoint decede d'un assure avec enfant a charge non issus du mariage avec le conjoint decede
    
    
    if (xconjDeces >= 1 && nombreEnfantMajeurConjointDecede === 0 && nombreEnfantConjointDecede > 0) {

        if (sexe in ['M', 'F'] && situationMatrimoniale === 'V' && xconjDeces >= 1) {
            
            switch (nombreEnfantConjointDecede) {
                case 1:
                    nombrePart = 2;
                    break;

                case 2:
                    nombrePart = 2.5;
                    break;

                case 3:
                    nombrePart = 3;
                    break;

                case 4:
                    nombrePart = 3.5;
                    break;

                case 5:
                    nombrePart = 4;
                    break;

                case 6:
                    nombrePart = 4.5;
                    break;

                // nombreEnfantConjointDecede >= 7
                default:
                    nombrePart = 5;
                    break;
            }
        }
    }

    return nombrePart;

}
