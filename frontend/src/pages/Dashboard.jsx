import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import DashboardCard from '../components/DashboardCard';
import { CreditCard, Star, BookOpen, Award, TrendingUp, Clock } from 'lucide-react';
import api from '../api';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    credits: user?.credits || 0,
    savedFeeds: 0,
    streak: 0,
    activity: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/users/dashboard');
        setStats({
          credits: response.data.credits,
          savedFeeds: response.data.savedFeeds,
          streak: response.data.streak,
          activity: response.data.activity
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        // Fall back to user credit data from context
        setStats(prev => ({
          ...prev,
          credits: user?.credits || 0
        }));
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  // Calculate the previous value for trend display
  const getActivityItems = () => {
    return stats.activity.slice(0, 3).map((item, index) => (
      <div key={index} className="flex items-center py-3 border-b border-gray-100 last:border-0">
        <div className="p-2 rounded-full bg-blue-50 text-blue-600 mr-3">
          <Clock size={16} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-800">{item.description}</p>
          <p className="text-xs text-gray-500">{new Date(item.timestamp).toLocaleString()}</p>
        </div>
        {item.creditChange && (
          <span className={`text-sm font-medium ${item.creditChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {item.creditChange > 0 ? '+' : ''}{item.creditChange}
          </span>
        )}
      </div>
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, {user?.name || 'Creator'}!</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <DashboardCard 
              title="Available Credits" 
              value={stats.credits} 
              previousValue={stats.credits - 10} // Example: assuming last week had 10 fewer credits
              icon={CreditCard} 
              variant="primary" 
            />
            <DashboardCard 
              title="Daily Streak" 
              value={stats.streak} 
              previousValue={stats.streak - 1}
              icon={TrendingUp} 
              variant="success" 
            />
            <DashboardCard 
              title="Saved Content" 
              value={stats.savedFeeds} 
              icon={BookOpen} 
            />
            <DashboardCard 
              title="Creator Level" 
              value={Math.floor(stats.credits / 100) + 1} 
              icon={Award} 
              variant="warning" 
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Earning Opportunities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-blue-100 bg-blue-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Star size={16} className="text-blue-600 mr-2" />
                    <h3 className="font-medium">Complete Your Profile</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Add more details to your profile to earn credits.</p>
                  <button className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors">
                    Earn 50 Credits
                  </button>
                </div>
                <div className="p-4 border border-green-100 bg-green-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Star size={16} className="text-green-600 mr-2" />
                    <h3 className="font-medium">Daily Login Bonus</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Log in tomorrow to continue your streak.</p>
                  <button className="text-sm bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 transition-colors">
                    Claim 10 Credits
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
              <div className="divide-y divide-gray-100">
                {stats.activity.length > 0 ? getActivityItems() : (
                  <p className="text-gray-500 py-4 text-center">No recent activity</p>
                )}
              </div>
              {stats.activity.length > 3 && (
                <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium mt-3">
                  View all activity
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;