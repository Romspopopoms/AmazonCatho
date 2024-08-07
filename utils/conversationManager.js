const { proposeContentPlan } = require('./conversationPlanning');

const handleUserInput = async (userId, userInput, step, platform, category, profile, excludedTypes, context) => {
  const { plans, setPlans, selectedPlan, setSelectedPlan } = context;

  let response;
  let options = [];

  try {
    console.log(`Step: ${step}, User Input: ${userInput}`);
    console.log(`Context before processing: plans=${JSON.stringify(plans)}, selectedPlan=${JSON.stringify(selectedPlan)}`);

    switch (step) {
      case 1:
        response = `Bonjour ${profile.name}! Sur quelle plateforme souhaitez-vous créer du contenu aujourd'hui ?`;
        options = ['Instagram', 'TikTok', 'Facebook', 'LinkedIn'];
        break;
      case 2:
        response = `Quels sont vos objectifs principaux pour ce mois de contenu sur ${platform}? Voulez-vous augmenter la notoriété ou améliorer l'engagement ?`;
        options = ['Augmenter la notoriété', 'Améliorer l\'engagement'];
        break;
      case 3:
        const objective = userInput.toLowerCase().includes('notoriété') ? 'notoriety' : 'engagement';
        const proposedPlans = proposeContentPlan(platform, objective, excludedTypes);
        console.log(`Proposed Plans: ${JSON.stringify(proposedPlans)}`);
        if (!proposedPlans || proposedPlans.length === 0) {
          response = `Désolé, je n'ai pas trouvé de plans pour la plateforme ${platform} avec l'objectif ${category}. Pouvez-vous choisir une autre option ?`;
          options = ['Augmenter la notoriété', 'Améliorer l\'engagement'];
          break;
        }
        setPlans(proposedPlans); // Met à jour les plans dans le contexte global
<<<<<<< HEAD
        console.log(`Updated Plans: ${JSON.stringify(plans)}`);
=======
        console.log(`Updated Plans: ${JSON.stringify(proposedPlans)}`);
>>>>>>> b8f93af823bb8640d223dc6906693fd59df91f44
        response = `Pour atteindre votre objectif de ${userInput}, combien de posts souhaitez-vous par semaine ? Choisissez entre 'Intensif' (1 par jour), 'Modéré' (2-3 par semaine) ou 'Léger' (1 par semaine).`;
        options = ['Intensif', 'Modéré', 'Léger'];
        break;
      case 4:
        const frequency = userInput.toLowerCase();
        const chosenPlan = plans.find(plan => plan.name.toLowerCase().includes(frequency));
        console.log(`Chosen Plan: ${JSON.stringify(chosenPlan)}`);
        if (!chosenPlan) {
          response = `Désolé, je n'ai pas trouvé de plan correspondant à votre choix. Pouvez-vous choisir une autre option ?`;
          options = ['Intensif', 'Modéré', 'Léger'];
          break;
        }
        setSelectedPlan(chosenPlan); // Met à jour le plan sélectionné dans le contexte global
        console.log(`Updated Selected Plan: ${JSON.stringify(selectedPlan)}`);
        response = `Vous avez choisi le ${chosenPlan.name}. Voici le détail du plan de contenu pour ${platform}:\n\n` +
                   chosenPlan.content.map(item => `- ${item.day || item.week}: ${item.type} - ${item.details}`).join('\n') +
                   `\n\nVoulez-vous générer les descriptions et les hashtags pour ces publications?`;
        options = ['Oui', 'Non'];
        break;
      case 5:
        if (userInput.toLowerCase() !== 'oui') {
          response = "Merci pour votre participation! Votre planning de contenu est prêt à être utilisé.";
          break;
        }
        const planDetails = selectedPlan.content.map(item => {
          return {
            ...item,
            description: `Nous avons adapté ce contenu pour correspondre à vos préférences: ${item.details}.`,
            hashtags: [`#${platform}`, `#${category}`, `#${item.type}`, '#YourBrand'].join(', '),
            prompt: `Generate content for a ${item.type} focusing on ${item.details} for ${platform}.`
          };
        });
        response = `Voici les descriptions et les hashtags pour chaque publication:\n\n` +
                   planDetails.map(item => `${item.day || item.week}:\n` +
                                           `Type: ${item.type}\n` +
                                           `Description: ${item.description}\n` +
                                           `Hashtags: ${item.hashtags}\n` +
                                           `Prompt: ${item.prompt}\n`).join('\n');
        break;
      default:
        response = "Merci pour votre participation! Votre planning de contenu est prêt à être utilisé.";
        break;
    }
  } catch (error) {
    console.error('Erreur de traitement dans handleUserInput:', error);
    throw error;
  }

  console.log(`Response: ${response}, Options: ${options}`);
  return { response, options };
};

module.exports = { handleUserInput };
