export interface EnterProps {
    showInfo: boolean;
    setShowInfo: (show: boolean) => void;
    setUserId: (id: string) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}