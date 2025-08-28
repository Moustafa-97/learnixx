/** @format */

// hooks/useComponentTour.ts
import {useEffect} from 'react';
import {useTour} from './tourProvider';
import {TourStep} from './tourRegistry';

interface UseComponentTourProps {
	componentId: string;
	steps: TourStep[];
	autoRegister?: boolean;
}

export const useComponentTour = ({
	componentId,
	steps,
	autoRegister = true,
}: UseComponentTourProps) => {
	const {registerComponentSteps} = useTour();

	useEffect(() => {
		if (autoRegister && steps.length > 0) {
			console.log('useComponentTour: Registering component steps');
			registerComponentSteps(componentId, steps);
		}
	}, [componentId, steps, autoRegister, registerComponentSteps]);

	return {
		componentId,
		steps,
	};
};
