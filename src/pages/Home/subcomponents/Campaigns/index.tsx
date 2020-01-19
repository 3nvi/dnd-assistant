import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_CAMPAIGNS = gql`
  query getCampaigns {
    campaigns {
      name
      dungeonMaster
      players
    }
  }
`;

interface Campaign {
  name: string;
  dungeonMaster: string;
  players: string;
}

interface CampaignData {
  campaigns: Campaign[];
}

const Campaigns: React.FC = () => {
  const { data, loading, error } = useQuery<CampaignData>(GET_CAMPAIGNS);

  if (loading) {
    return <div>'Loading...'</div>;
  }

  if (error) {
    return <div>'An error has occured'</div>;
  }

  return (
    <div>
      {data!.campaigns.map(campaign => (
        <div>
          <span>Name: {campaign.name}</span>
          <span>Dungeon Master: {campaign.dungeonMaster}</span>
          <span>Players: {campaign.players}</span>
        </div>
      ))}
    </div>
  );
};

export default Campaigns;
