"use client";

import Image from "next/image";
import type { PublicProfile } from "@/content/portfolio";
import { githubSnapshot, profileMetricsSnapshot } from "@/content/portfolio";
import { useLiveData } from "@/components/live-data";
import { brandIcons } from "@/content/brand-icons";

function PlatformMark({ name, size = 27 }: { name: string; size?: number }) {
  return (
    <span
      className={`platform-logo logo-${name.toLowerCase().replace(/[^a-z]/g, "")}`}
    >
      {name === "Codeforces" ? (
        <span className="codeforces-bars" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      ) : brandIcons[name] ? (
        <Image src={brandIcons[name]} alt="" width={size} height={size} />
      ) : (
        <strong aria-hidden="true">
          {name === "Tableau Public" ? "T" : name.slice(0, 1)}
        </strong>
      )}
    </span>
  );
}

function MiniBars({
  values,
  label,
  color,
}: {
  values: number[];
  label: string;
  color: string;
}) {
  const largest = Math.max(1, ...values);
  return (
    <div className="mini-bars" role="img" aria-label={label}>
      {values.map((value, index) => (
        <span
          key={index}
          style={{
            height: `${Math.max(9, (value / largest) * 100)}%`,
            background: color,
          }}
          title={`${value}`}
        />
      ))}
    </div>
  );
}

function RatingLine({ values }: { values: number[] }) {
  if (values.length < 2) return null;
  const min = Math.min(...values) - 50;
  const max = Math.max(...values) + 50;
  const points = values
    .map(
      (value, index) =>
        `${(index / (values.length - 1)) * 100},${68 - ((value - min) / Math.max(1, max - min)) * 60}`,
    )
    .join(" ");
  return (
    <svg
      className="rating-line"
      viewBox="0 0 100 75"
      preserveAspectRatio="none"
      role="img"
      aria-label={`Codeforces rating across ${values.length} contests, from ${values[0]} to ${values.at(-1)}`}
    >
      <polyline
        points={points}
        fill="none"
        stroke="#86a7ff"
        strokeWidth="2.5"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type ActivityDay = { date: string; count: number };

function ProfileGraph({
  platform,
  pullActivity,
}: {
  platform: string;
  pullActivity?: ActivityDay[];
}) {
  const data = useLiveData();
  if (platform === "GitHub") {
    const repos =
      data?.github?.publicRepos ?? profileMetricsSnapshot.github.publicRepos;
    const followers =
      data?.github?.followers ?? profileMetricsSnapshot.github.followers;
    return (
      <div className="profile-graph profile-graph-github">
        <div className="graph-title">
          {pullActivity?.length ? "Authored PRs" : "Public activity"}{" "}
          <span>
            {pullActivity?.length
              ? "Past 26 weeks"
              : data?.github?.weeklyActivity
                ? "Recent 12 weeks"
                : "Verified profile"}
          </span>
        </div>
        {pullActivity?.length ? (
          <div
            className="mini-heatmap"
            role="img"
            aria-label="Authored open-source pull requests over the past 26 weeks"
          >
            {pullActivity.map((day) => (
              <i
                key={day.date}
                className={`level-${Math.min(day.count, 4)}`}
                title={`${day.date}: ${day.count} authored PRs`}
              />
            ))}
          </div>
        ) : data?.github?.weeklyActivity ? (
          <MiniBars
            values={data.github.weeklyActivity}
            label="Recent GitHub public events"
            color="#4dd990"
          />
        ) : (
          <div className="graph-ledger">
            <span>
              <b>{repos}</b>
              <small>Repositories</small>
            </span>
            <span>
              <b>{followers}</b>
              <small>Followers</small>
            </span>
          </div>
        )}
        <div className="graph-foot">
          <span>
            <b>{repos}</b> repos
          </span>
          <span>
            <b>{followers}</b> followers
          </span>
        </div>
      </div>
    );
  }
  if (platform === "LeetCode") {
    const counts = data?.leetcode ?? profileMetricsSnapshot.leetcode;
    const total = Math.max(1, counts.solved);
    const easy = (counts.easy / total) * 100;
    const medium = (counts.medium / total) * 100;
    return (
      <div className="profile-graph profile-graph-leetcode">
        <div className="graph-title">
          Solved problems <span>By difficulty</span>
        </div>
        <div className="leetcode-graph">
          <div
            className="leetcode-donut"
            style={{
              background: `conic-gradient(#43ca9b 0 ${easy}%,#e3ad5b ${easy}% ${easy + medium}%,#b477ed ${easy + medium}% 100%)`,
            }}
          >
            <span>
              <b>{counts.solved}</b>
              <small>solved</small>
            </span>
          </div>
          <div className="difficulty-list">
            <span>
              <i className="easy" />
              Easy <b>{counts.easy}</b>
            </span>
            <span>
              <i className="medium" />
              Medium <b>{counts.medium}</b>
            </span>
            <span>
              <i className="hard" />
              Hard <b>{counts.hard}</b>
            </span>
          </div>
        </div>
      </div>
    );
  }
  if (platform === "Codeforces") {
    const rating =
      data?.codeforces?.rating ?? profileMetricsSnapshot.codeforces.rating;
    const rank =
      data?.codeforces?.rank ?? profileMetricsSnapshot.codeforces.rank;
    return (
      <div className="profile-graph profile-graph-codeforces">
        <div className="graph-title">
          Contest rating{" "}
          <span>
            {data?.codeforces?.ratingHistory?.length
              ? "Recent contests"
              : "Verified profile"}
          </span>
        </div>
        <div className="rating-graph">
          <span>
            <b>{rating}</b>
            <small>{rank}</small>
          </span>
          {data?.codeforces?.ratingHistory && (
            <RatingLine values={data.codeforces.ratingHistory} />
          )}
        </div>
        <div className="graph-foot">
          <span>Codeforces official rating</span>
          <span aria-hidden="true">↗</span>
        </div>
      </div>
    );
  }
  if (platform === "Kaggle") {
    const datasets =
      data?.kaggle?.datasets ?? profileMetricsSnapshot.kaggle.datasets;
    return (
      <div className="profile-graph profile-graph-kaggle">
        <div className="graph-title">
          Data work <span>Public datasets</span>
        </div>
        <div className="kaggle-graph">
          <strong>{datasets}</strong>
          <div
            className="dataset-bars"
            role="img"
            aria-label={`${datasets} public Kaggle datasets`}
          >
            {Array.from({ length: Math.min(datasets, 24) }, (_, index) => (
              <i key={index} />
            ))}
          </div>
        </div>
        <div className="graph-foot">
          <span>
            {data?.kaggle?.latestDataset
              ? `Latest: ${data.kaggle.latestDataset}`
              : "Datasets on Kaggle"}
          </span>
          <span aria-hidden="true">↗</span>
        </div>
      </div>
    );
  }
  return null;
}

export function PrimaryProfileCard({
  profile,
  index,
  pullActivity,
}: {
  profile: PublicProfile;
  index: number;
  pullActivity?: ActivityDay[];
}) {
  return (
    <a
      className={`profile-showcase-card platform-${profile.platform.toLowerCase()}`}
      href={profile.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="profile-showcase-top">
        <PlatformMark name={profile.platform} />
        <span>
          <strong>{profile.platform}</strong>
          <small>{profile.category}</small>
        </span>
        <i aria-hidden="true">↗</i>
      </div>
      <ProfileGraph platform={profile.platform} pullActivity={pullActivity} />
      <div className="profile-showcase-bottom">
        <span>{profile.handle}</span>
        <span>
          View profile <b aria-hidden="true">↗</b>
        </span>
      </div>
      <span className="profile-card-index" aria-hidden="true">
        0{index + 1}
      </span>
    </a>
  );
}

export function SecondaryProfileCard({ profile }: { profile: PublicProfile }) {
  const data = useLiveData();
  const huggingFace =
    profile.platform === "Hugging Face" ? data?.huggingFace : null;
  return (
    <a
      className="secondary-profile-card"
      href={profile.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="secondary-profile-top">
        <PlatformMark name={profile.platform} size={25} />
        <span>
          <strong>{profile.platform}</strong>
          <small>{profile.category}</small>
        </span>
        <i aria-hidden="true">↗</i>
      </div>
      <div className="secondary-profile-middle">
        {huggingFace &&
        huggingFace.models + huggingFace.datasets + huggingFace.spaces > 0 ? (
          <div className="hf-live-counts">
            <span>
              <b>{huggingFace.models}</b> models
            </span>
            <span>
              <b>{huggingFace.datasets}</b> datasets
            </span>
            <span>
              <b>{huggingFace.spaces}</b> spaces
            </span>
          </div>
        ) : (
          <>
            <strong>{profile.description}</strong>
            <span>{profile.handle}</span>
          </>
        )}
      </div>
      <div className="secondary-profile-bottom">
        <span>Explore public profile</span>
        <b aria-hidden="true">→</b>
      </div>
    </a>
  );
}

export { PlatformMark };

export function CodingMetricsStrip() {
  const data = useLiveData();
  const metrics = [
    {
      icon: "GitHub",
      value:
        data?.github?.publicRepos ?? profileMetricsSnapshot.github.publicRepos,
      label: "Public repositories",
    },
    {
      icon: "GitHub",
      value: data?.github?.mergedPulls ?? githubSnapshot.mergedPullRequests,
      label: "Merged PRs",
    },
    {
      icon: "LeetCode",
      value: data?.leetcode?.solved ?? profileMetricsSnapshot.leetcode.solved,
      label: "Problems solved",
    },
    {
      icon: "Codeforces",
      value:
        data?.codeforces?.rating ?? profileMetricsSnapshot.codeforces.rating,
      label: "Contest rating",
    },
  ];
  return (
    <div className="coding-metrics-strip">
      <div className="page-width coding-metrics-inner">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <PlatformMark name={metric.icon} size={20} />
            <span>
              <strong>{metric.value.toLocaleString()}</strong>
              <small>{metric.label}</small>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
