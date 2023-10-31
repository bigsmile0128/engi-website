import axios from 'axios';
import { gql } from 'graphql-request';
import { useMutation } from 'react-query';
import useUploadS3 from '~/utils/hooks/useUploadS3';

export type UpdateUserArgs = {
  displayName?: string;
  imageFile?: File;
  userType?: string;
};

export default function useUpdateUser() {
  const uploadMutation = useUploadS3();
  return useMutation<void, any, any>(
    ['updateUser'],
    async ({ displayName, imageFile, userType }: UpdateUserArgs) => {
      const args: any = {};

      if (displayName) {
        args.display = displayName;
      }
      if (imageFile) {
        const profileImageUrl = await uploadMutation.mutateAsync(imageFile);
        args.profileImageUrl = profileImageUrl;
      }
      if (userType) {
        args.userType = userType;
      }

      const { data } = await axios.post('/api/graphql', {
        query: gql`
          mutation UpdateUser($userArgs: UpdateUserArguments!) {
            user {
              update(args: $userArgs) {
                email
                display
                profileImageUrl
                freelancerSettings {
                  jobPreference
                }
                businessSettings {
                  companyName
                  preferredTechnologies
                }
                emailSettings {
                  weeklyNewsletter
                  jobAlerts
                  technicalUpdates
                }
                createdOn
                githubEnrollments {
                  installationId
                  createdOn
                  owner {
                    login
                    avatarUrl
                  }
                }
                balance
                wallet
                userType
              }
            }
          }
        `,
        variables: {
          userArgs: args,
        },
      });

      if (data.errors?.length > 0) {
        throw new Error(data?.errors?.[0]?.message ?? 'Unable to update user.');
      }
      return;
    }
  );
}
