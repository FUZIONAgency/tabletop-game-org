import PageLayout from "@/components/PageLayout";
import Section from "@/components/Section";

const MyTeam = () => {
  return (
    <PageLayout>
      <Section
        id="my-team"
        title="My Team"
        subtitle="Team Management"
      >
        <div className="space-y-4">
          <p className="text-muted-foreground">
            View and manage your team members here.
          </p>
        </div>
      </Section>
    </PageLayout>
  );
};

export default MyTeam;