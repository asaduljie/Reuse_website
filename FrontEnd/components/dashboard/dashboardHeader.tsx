interface DashboardHeaderProps {

  title: string;

  description: string;

}

export default function DashboardHeader({

  title,

  description,

}: DashboardHeaderProps) {

  return (

    <div

      className="
      mb-10
      "

    >

      <h2

        className="
        text-4xl
        font-bold
        "

      >

        {title}

      </h2>

      <p

        className="
        mt-3
        text-gray-500
        leading-7
        "

      >

        {description}

      </p>

    </div>

  );

}