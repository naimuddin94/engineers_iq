import Followers from "./_components/Followers";
import HandleProfileImage from "./_components/HandleProfileImage";
import HandleProfileInfo from "./_components/HandleProfileInfo";

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
        <div className="lg:order-1 lg:col-span-2 order-2">
          <div className="flex flex-col items-start mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              {data?.name}
            </h1>
            <div className="flex mt-4 space-x-4 flex-wrap">
              <p
                className={`font-medium underline cursor-pointer`}
                color="foreground"
              >
                Home
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
