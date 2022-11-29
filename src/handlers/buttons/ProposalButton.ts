import { ButtonBuilder } from '@discordjs/builders';

import Button from './shared/Button';

const ProposalButton = new Button('send_proposal', new ButtonBuilder().setLabel('Envoyer une suggestion'));
export default ProposalButton;
