import Followers from "./_components/Followers";
import HandleProfileImage from "./_components/HandleProfileImage";
import HandleProfileInfo from "./_components/HandleProfileInfo";
import ProfileArticles from "./_components/ProfileArticles";

import Container from "@/components/shared/Container";
import { getProfile } from "@/services/AuthService";

type Params = Promise<{ user: string }>;

export default async function Profile({ params }: { params: Params }) {
  const { user } = await params;

  const { data } = await getProfile(user);

  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile Info for mobile, Right for large screens */}
        <div className="lg:order-2 lg:col-span-1 order-1">
          {/* Handle profile image for user */}
          <HandleProfileImage user={data} />

          {/* Handle user fullname for user */}
          <HandleProfileInfo user={data} />

          {/* Following List */}
          <Followers username={user} />
        </div>

        {/* Right Column: Content for mobile, Left for large screens */}
        <ProfileArticles user={data} />
      </div>
    </Container>
  );
}
